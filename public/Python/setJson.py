import json
import subprocess
import argparse

def git_add(files="*"):
    """Add files to the git staging area."""
    try:
        # Add all files by default, can specify particular files or patterns as argument
        subprocess.run(["git", "add", files], check=True)
        print("Files added successfully.")
    except subprocess.CalledProcessError as e:
        print("An error occurred while adding files to git:", e)

def git_commit(message="Quick commit"):
    """Commit staged changes in git."""
    try:
        subprocess.run(["git", "commit", "-m", message], check=True)
        print("Commit successful.")
    except subprocess.CalledProcessError as e:
        print("An error occurred during git commit:", e)

def git_push(remote="origin", branch="master"):
    """Push committed changes to a remote repository."""
    try:
        subprocess.run(["git", "push", remote, branch], check=True)
        print("Changes pushed successfully.")
    except subprocess.CalledProcessError as e:
        print("An error occurred while pushing to git:", e)


def read_data(filename):
    """Reads user card data from a formatted text file and organizes it into a specific format, handling '@' in usernames."""
    data = {}
    with open(filename, 'r') as file:
        for line in file:
            parts = line.strip().split('=')
            if parts and len(parts) == 2:
                # Handle user name with potential '@' prefix
                user = parts[0].strip().lstrip('@"').lower()
                cards = parts[1].strip().strip('"')
                card_numbers = [int(num) for num in cards.split() if num.isdigit()]
                if user not in data:
                    data[user] = {'carte': [], 'nb': []}
                for card in card_numbers:
                    if card in data[user]['carte']:
                        index = data[user]['carte'].index(card)
                        data[user]['nb'][index] += 1
                    else:
                        data[user]['carte'].append(card)
                        data[user]['nb'].append(1)
    return data

def update_json_sorted(json_filename, new_data):
    """Updates or creates a JSON file with the new user card data in the specified format, sorting cards by number."""
    try:
        with open(json_filename, 'r') as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = {}

    # Update existing data with new data and sort the cards
    for user, cards_info in new_data.items():
        if user in existing_data:
            for i, card in enumerate(cards_info['carte']):
                if card in existing_data[user]['carte']:
                    index = existing_data[user]['carte'].index(card)
                    existing_data[user]['nb'][index] += cards_info['nb'][i]
                else:
                    existing_data[user]['carte'].append(card)
                    existing_data[user]['nb'].append(cards_info['nb'][i])
            # Combine, sort, and split the lists based on card numbers
            combined = sorted(zip(existing_data[user]['carte'], existing_data[user]['nb']))
            existing_data[user]['carte'], existing_data[user]['nb'] = zip(*combined)
        else:
            # Sort new user data before adding
            combined = sorted(zip(cards_info['carte'], cards_info['nb']))
            cards_info['carte'], cards_info['nb'] = zip(*combined)
            existing_data[user] = cards_info

    with open(json_filename, 'w') as file:
        json.dump(existing_data, file, indent=4)

# Example usage
# Uncomment the following lines to execute

def main():
    parser = argparse.ArgumentParser(description="Update JSON file with new card data.")
    parser.add_argument("json_file", help="Path to the JSON file to update.")
    parser.add_argument("data_file", help="Path to the data file with new card information.")
    args = parser.parse_args()

    # Assume 'read_data' is a function that parses the data file and returns data in the required format
    new_data = read_data(args.data_file)
    update_json_sorted(args.json_file, new_data)

if __name__ == "__main__":
    main()


#data = read_data("usercards.txt.ini")
#try:
#    data = read_data("C:/Users/Niko/Desktop/x64/cards/usercards.txt.ini")
#except Exception as e:
#    print("Erreur lors de la lecture du fichier :", e)

#update_json_sorted("users_cards.json", data)

# Example usage (uncomment to execute)
# git_add()
# git_commit("update Package json")
# git_push("origin", "develop")

#C:\Users\Niko\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\LocalCache\local-packages\Python310\Scripts\pyinstaller.exe --onefile setJson.py
