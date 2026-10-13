#!/usr/bin/env bash
set -euo pipefail

npm install -g npm@11.4.1 && npm install -g serve && npm install

# Run the install script from the dotfiles bind-mounted from the host (see devcontainer.json),
# checking the same script names VS Code's built-in dotfiles support looks for.
dotfiles="$HOME/dotfiles"
for script in install.sh install bootstrap.sh bootstrap script/bootstrap setup.sh setup script/setup; do
  if [ -f "$dotfiles/$script" ]; then
    echo "Running $dotfiles/$script"
    (cd "$dotfiles" && bash "./$script")
    exit 0
  fi
done
echo "No install script found in $dotfiles; skipping dotfiles setup" >&2
