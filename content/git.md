Here to list some useful Git commands and use cases.

# Git
  
## Commit with empty message

1. `git config --global alias.nccommit "commit -a --allow-empty-message -m ''"`
1. `git nccommit`  

## Undoing Things

- Overwrite commit
  1. `git commit -m 'initial commit'`
  1. `git add .`
  1. `git commit --amend`
  
- Unstaging a Staged File

  ```bash
  $ git add *
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)

      renamed:    README.md -> README
      modified:   CONTRIBUTING.md
  ```
  
  ```bash
  $ git reset HEAD CONTRIBUTING.md
  Unstaged changes after reset:
  M    CONTRIBUTING.md
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)

      renamed:    README.md -> README

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   CONTRIBUTING.md
  ```

- Unmodifying a Modified File

  ```bash
  Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
  ```

  ```bash
  $ git checkout -- CONTRIBUTING.md
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
  ```
  
- View all logs
  
  `git reflog`
  

## Push changes to new branch

1. `git checkout -b newBranch`
1. `git push -u origin newBranch`  // -u is short for `--set-upstream`

## New branch from remote

1. `git checkout -b localBranch origin/remote_branch`

## Stash Usage

```
git stash  // stash current changes
git stash pop  // pop last stash and remove from history
```

```
git stash save 'message'  // stash current changes with message
git stash list // show all stashes
git stash apply <id>  // apply <id> stash
```

## Common Alias

```
git config --global alias.s "status"
git config --global alias.a "!git add . && git status"
git config --global alias.au "!git add -u . && git status"
git config --global alias.aa "!git add . && git add -u . && git status"
git config --global alias.c "commit"
git config --global alias.cm "commit -m"
git config --global alias.ca "commit --amend"
git config --global alias.ac "!git add . && git commit"
git config --global alias.acm "!git add . && git commit -m"
git config --global alias.l "log --graph --all --pretty=format:'%C(yellow)%h%C(cyan)%d%Creset %s %C(white)- %an, %ar%Creset"
git config --global alias.ll "log --stat --abbrev-commit"
git config --global alias.lg "log --color --graph --pretty=format:'%C(bold white)%h%Creset -%C(bold green)%d%Creset %s %C(bold green)(%cr)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
git config --global alias.llg 'log --color --graph --pretty=format:'%C(bold white)%H %d%Creset%n%s%n%+b%C(bold blue)%an <%ae>%Creset %C(bold green)%cr (%ci)' --abbrev-commit"
git config --global alias.d "diff"
git config --global alias.master "checkout master"
git config --global alias.spull "svn rebase"
git config --global alias.spush "svn dcommit"
git config --global alias.alias "!git config --list | grep 'alias\.' | sed 's/alias\.\([^=]*\)=\(.*\)/\1\     => \2/' | sort"
```

## Workflow with Git: Fork, Branching, Commits, and Pull Request

1. Fork a repo.

2. Clone the forked project to your local machine:

    `$ git clone git@github.com:USERNAME/<forked_repo>`

3. Configure remotes:

    `$ git remote add upstream git://github.com/<origin_repo>`

4. Create a branch for new feature:

    `$ git checkout -b my-new-branch`

5. Develop on my-new-branch branch only, but Do not merge my-new-branch branch to the your master (as it should stay equal to upstream master)!!

6. Commit changes to my-new-branch branch:

    ```
    $ git add .
    $ git commit -m "commit message"
    ```

7. Push branch to GitHub, to allow your mentor to review your code:

    `$ git push origin my-new-branch`

8. Repeat steps 5-7 till development is complete.

9. Fetch upstream changes that were done by other contributors:

    `$ git fetch upstream`

10. Update local master:

    ```
    $ git checkout master
    $ git pull upstream master
    ```

    ATTENTION: any time you lost of track of your code – launch “gitk —all” in source folder, UI application come up that will show all branches and history in pretty view, explanation.

11. Rebase my-new-branch branch on top of the upstream master:

    ```
    $ git checkout my-new-branch
    $ git rebase master
    ```

12. In the process of the rebase, it may discover conflicts. In that case it will stop and allow you to fix the conflicts. After fixing conflicts, use `git add .` to update the index with those contents, and then just run:

    `$ git rebase --continue`

13. Push branch to GitHub (with all your final changes and actual code):

    We forcing changes to your issue branch(our sand box) is not common branch, and rebasing means recreation of commits so no way to push without force. NEVER force to common branch.

    `$ git push origin my-new-branch --force`

14. Created build for testing and send it to any mentor for testing.

15. Only after all testing is done – Send a Pull Request.

    Attention: Please recheck that in your pull request you send only your changes, and no other changes!!
    Check it by command:
    git diff my-new-branch upstream/master
    
## Submodule

  ```
  git submodule add submodule-repo path
  git submodule update --init --recursive
  git rm submodule-name
  git rm submodule-name --cached
  ```

