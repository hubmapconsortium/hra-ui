# Editing the humanatlas.io content

### This document provides a step-by-step guide on how to edit content on pages using YAML files for humanatlas.io. YAML files are used to define the content of pages on the website. By following these instructions, you can contribute to the Human Atlas project and help improve its content.

### Video Tutorial: Steps to Add/Edit content on humanatlas.io pages.

https://github.com/cns-iu/humanatlas.io/assets/53601863/7d1039f8-fd0f-4701-ae8e-df027b5ed032

### Steps to Add/Edit YAML Files

1. Open https://humanatlas.io/
2. Navigate to the page that needs to be updated and copy the route.
   ![Route](images/routeName.png)

3. Open https://github.com/cns-iu/humanatlas.io

4. In the URL, update '.com' with '.dev'. (https://github.com/cns-iu/humanatlas.io -> https://github.dev/cns-iu/humanatlas.io)

5. If not installed, install the YAML Extenstion (search 'redhat.vscode-yaml' in Extensions Marketplace)
   ![Extension](images/extension.png)

6. Navigate to Source Control and create a new branch off the main/develop branch.
   ![Create Branch From](images/createBranchFrom.png)

7. Enter your branch name and press Enter

8. Select the reference branch(main/develop) for your new branch and click 'Switch to Branch' to switch to your new branch.

9. Navigate to ../src/assets/content/pages in the directory and open the YAML file with the same name as the route copied earlier.

10. Type '- type:' and hit enter. You will be recommended with the list of the components which you can add.

11. Select the component you want to add. Hover over the component name for the description of the component.
    ![List of Components](images/listOfComponents.png)

12. If you see any error, hover over it to see what fields are missing and add them accordingly.
    ![Error](images/error.png)

13. Once you are done with adding the new component, head back to Source Control. Add a commit message and push it to your branch.
    ![Commit and Push](images/push.png)

14. From Views and More Actions, select Pull Request and create new Pull Request.

15. In MERGE CHANGES FROM section, select cns-iu/humanatlas.io in REMOTE and 'your_branch_name' in BRANCH. In INTO section, select cns-iu/humanatlas.io in REMOTE and main or develop in BRANCH (based on where you want to merge your changes). Add title and description for your Pull Request and click Create.  
    ![New PR](images/createPR2.png)

16. The maintainers of the humanatlas.io will now review your Pull Request. They may approve it or may ask you to make more changes.
