# Autograder compilation uploader

This script is used to upload the java compilation stderr/stdout to the server.

For instructors:
1. Copy `upload.py` into your autograder directory.
2. Either copy `run.sh` or change the following line:

```bash
    } &> /dev/null
```

to 

```bash
    } 2>&1 | python3 upload.py
```

3. Upload your modified autograder.