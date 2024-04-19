import subprocess

def run_command(command):
    """Exécute une commande système et gère correctement la sortie."""
    try:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8')
        # Attendre que la commande se termine
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            print(f"Error: {stderr}")
            raise subprocess.CalledProcessError(process.returncode, command, output=stdout, stderr=stderr)
        else:
            print("Output:", stdout)
            print("Error:", stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error executing {command}: {e}")
    except Exception as e:
        print(f"Other error: {e}")

def main():
    # Liste des commandes à exécuter
    commands = [
        "quasar build",
        "git add *",
        'git commit -m "test"',
        "git push"
    ]
    for cmd in commands:
        print(f"Executing: {cmd}")
        run_command(cmd)

if __name__ == "__main__":
    main()
