# Personal Homepage

This Jekyll website is based on the "Forty" theme by [HTML5 UP](https://html5up.net/), converted to Jekyll by andrewbanchich ([GitLab repository](https://gitlab.com/andrewbanchich/forty-jekyll-theme))

## How to use

1. Setup Jekyll if you want to build this website on a local machine
2. Modify the `_config.yml` to change key configurations of the website
3. Change the menu content in the `_includes/header.html`. All the static pages have been automatically added to the menu.
4. Change the call to action button on the banner of the homepage in the `_layers/home.html`
5. Change the text at the bottom of the homepage in the `index.md`
6. Change the call to action at the bottom of the homepage in the `_layouts/home.html` in section two.
7. The tiles on the front page are generated automatically from the static pages (e.g., `1_research.md`). The metadata of the page (description, title, and images) are used to populate the tiles and the homepage
8. Use the `_posts` to write new posts for the website, as usual (TBA for the categorization of posts).

## Other details

### Implementation of the tag

The category or tagging is implemented as follows:
1. A page used for displaying a group of posts (e.g., `all_posts.md`) contains a variable called `tag_to_show` in the metadata, which contains the tag to show
2. The `tag_to_show` variable is used by the `_layouts/allposts.html` to retrieve only posts with the required tag.
3. In order to assign a post to a tag, you need to define the `tag` variable in the metadata of a post. If you do that, everything would be completed automatically. 

Types of supported tags:
- publication: announcement and detail of a published paper
- projects: project details
- technical: musing on technical topics
