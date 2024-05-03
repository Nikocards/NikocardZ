import subprocess

def git_operations():
    try:
        # Ajoute tous les fichiers modifiés au dépôt
        subprocess.run(["git", "add", "*"], check=True)
        
        # Effectue un commit avec un message
        subprocess.run(["git", "commit", "-m", "bdd"], check=True)
        
        # Pousse les changements vers le serveur distant
        subprocess.run(["git", "push"], check=True)
        
        print("Les opérations Git ont été effectuées avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"Une erreur est survenue lors de l'exécution de la commande Git: {e}")

# Exécute les opérations Git
git_operations()
