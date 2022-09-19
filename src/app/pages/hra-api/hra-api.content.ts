import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { UseButton } from "src/app/components/use-button/use-button";

export const pageHeaderData: PageHeaderItems[] = [
    {
        title: 'Human Reference Atlas Application Programming Interfaces',
        subtitle: 'Query and interact with the HRA using Python, JavaScript, SPARQL, REST, and more',
        image: 'assets/images/hra_api.png'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: 'This API provides programmatic access to data registered to the Common Coordinate Framework. A listing of API endpoints and database schema descriptions with examples are provided.'
    }
]

export const acknowledgmentsData: PageDataItems[] = [
    {
        heading: 'Acknowledgments',
        descriptions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
]

export const useButtonData: UseButton =
{
    text: 'Use the Human Reference Atlas APIs',
    url: 'https://ccf-api.hubmapconsortium.org/#/operations/reference-organs'
}
