# StarWars

The application allows you to fight battles between characters from the Star Wars universe. The user can choose which type of resource to use in battle: people or aircraft. Each resource also has its own attributes to be selected, which will be compared.

The data is downloaded via [SWAPI](https://www.swapi.tech/). Due to the nature of this API, it is not always possible to draw resources. This is because some id numbers do not return any resource (for example person with id 17 is missing). In such case, an error message is displayed in the application and a button can be pressed to perform a redraw.
