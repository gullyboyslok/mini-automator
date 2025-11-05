# mini-automator

# overview
mini automator is a small project i made for fun to try and recreate n8n in code. I also hadn't tried using a lot of more complex APIs outside of n8n.

nodes is just a lot of code that I didn't want filling up the space in workflows. in n8n you have nodes like "gmail" in which there are functions like "send", "read", etc. I did a similar thing. The only existing node types are gmail, sheets, and openai as of 11/4.

workflows use nodes to accomplish tasks. I'm currently in the process of working on my "stock email" workflow.

index.js just runs all the workflows.
