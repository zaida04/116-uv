#!/bin/bash

java -version

export HOME=/home/autograde

printf "\n*** Extracting your files ***\n\n"
unzip handin.zip -d ./submission "*.java"

# https://stackoverflow.com/questions/2709458/how-to-replace-spaces-in-file-names-using-a-bash-script
find ./submission -depth -name '* *' \
| while IFS= read -r f ; do mv -i "$f" "$(dirname "$f")/$(basename "$f"|tr ' ' _)" ; done

find ./submission/ -type f -name '*.class' -delete

python3 prechecks.py

MY_CLASSPATH=".:output"
for jar in `ls lib/*.jar`;do
    MY_CLASSPATH=${MY_CLASSPATH}:${jar}
done

mkdir output


if [[ -e clean.txt ]]; then
    rm clean.txt
    # compile every scala file in the submission directory and place compiled submission in output/
    find ./submission -name "*.java" > tmp.txt
    javac -encoding utf8 -classpath "$MY_CLASSPATH" -d output @tmp.txt


#    printf "\n** Testing Your Submission **\n\n"
    {
        # compile my code
        find ./grading -name "*.java" > tmp.txt
        javac -encoding utf8 -classpath "$MY_CLASSPATH" -d output @tmp.txt
        rm tmp.txt

#        if [ ! -d "output/grading" ]; then
#          # if compiling all my code in one shot doesn't work, compile them separately
#          # -with the new setup, this should never happen
#          printf "\n** Compiling separately\n\n"
#          javac -encoding utf8 -classpath "$MY_CLASSPATH" -d output grading/GradingTests.java
#          javac -encoding utf8 -classpath "$MY_CLASSPATH" -d output grading/RunGradingTests.java
#          javac -encoding utf8 -classpath "$MY_CLASSPATH" -d output grading/RunStudentTests.java
#        fi


        mkdir "results"


        ## Run my tests against their code


        printf "\n* Testing your code with my tests *\n"

        java -classpath "$MY_CLASSPATH" "grading.RunGradingTests" "results/my_tests.json"


        ## Tests their tests ##
        printf "\n** Running your tests against your own code **\n\n"

        # run their tests against their own code

        java -classpath "$MY_CLASSPATH" "grading.RunStudentTests" "results/student.json"



        # delete their code, but not their tests
        #/************** Change this for each assignment!!! **************/
        rm -r output/ratings


        printf "\n** Running your tests against my code **\n\n"

        # run their tests against my code


        for path in "bad"/*
        do
          printf "\n* Path ${path} *\n"
          java -classpath "$MY_CLASSPATH:${path}" "grading.RunStudentTests" "results/$(basename ${path})"
        done

        # test correct code last to prevent the "pass first two then always fail" attack
        java -classpath "$MY_CLASSPATH:correct" "grading.RunStudentTests" "results/correct_solution.json"


    } 2>&1 | python3 upload.py

fi



python3 gather_results.py

# rm -rf output
# rm -rf results
# rm -rf submission
