from ./trials import files


# List all the files in the directory dir

def list_files(dir):
    return files.list_files(dir)


# Read the content of the file file

def read_file(file):
    return files.read_file(file)

# Extract the environment variables from the file file

def extract_env(file):
    return files.extract_env(file)


# Extract the additional environment data from the files

def extract_env_data(files):
    return files.extract_env_data(files)


if __name__ == '__main__':
    print(list_files('test_data'))
    print(read_file('test_data/test1.txt'))
    print(extract_env('test_data/test1.txt'))
    print(extract_env_data(['test_data/test1.txt', 'test_data/test2.txt']))

    