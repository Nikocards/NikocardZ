import subprocess

import subprocess

def run_command(command):
    """Exécute une commande système et affiche la sortie."""
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding='utf-8')
        print("Output:", result.stdout)
        print("Error:", result.stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error executing {command}: {e}")
    except UnicodeDecodeError as e:
        print(f"Unicode decode error: {e}")



def main():
    # Build du projet Quasar
    print("Building Quasar project...")
    run_command("quasar build")

    # Ajouter tous les fichiers modifiés au commit
    print("Adding files to git...")
    run_command("git add *")

    # Commit des modifications
    print("Committing changes...")
    run_command('git commit -m "commit"')

    # Pousser les changements sur le dépôt distant
    print("Pushing changes to remote...")
    run_command("git push")

if __name__ == "__main__":
    main()
