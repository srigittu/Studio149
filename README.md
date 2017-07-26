# Studio149


step 1. open www.github.com and click the project repository and click "FORK"

step 2. create a folder name in your project name . In terminal go to that place and clone
	git clone https://github.com/{{your_name}}/Studio149.git

step 3. now set the upstream project
	git remote add upstream https://github.com/srigittu/Studio149.git

step 4: get all the branch in the upstream
	git fetch upstream

step 5. create your own branch 
	git checkout --track -b feature/admin-module upstream/phase-one

Here "phase-one" in the brach which you want to pull to
Here 'feature/admin-module' is the name of the branch name which is your working module

step 5.do what ever on the code

step 6. After changes in file stash your changes
	git stash

step 7. now pull the data last updated in the git
	git pull -r upstream dev

step 8. Then apply your changes
	git stash apply

step 9. If, conflicts exits resolve them. Add the file for staging & thn reset your HEAD
	git add
	git reset HEAD

step 10. After tht, commit the changes to git
	git commit -am "Your commit message here"

step 11. now push the content to the origin that is our own branch
	git push origin HEAD

step 12. Now open the github.com
click  compare & pull request button 

step 13.  change the base to "phase-one" branch

step 14. click create pull request button

step 15. the write access person will get the pull request
that person can click "merge request" , "confirm", "delete branch"


Note: to delete the branch in our local with terminal command  use this
	git branch -D branchname
