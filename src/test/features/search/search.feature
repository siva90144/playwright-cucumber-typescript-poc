@Search @regression
Feature: Search - Verify end to end flow
    I want to verify Search flow

    @actual @validate-e2e @search
    Scenario Outline: Search - I am able to search in the web "<client>"
        Given I login the application for "<client>"
        When I get the page title
        Then I verify details "<pagetitle>"
        @google
        Examples:
            | client | pagetitle |
            | google | Google    |
        @amazon
        Examples:
            | client | pagetitle |
            | amazon | Amazon    |
        @facebook
        Examples:
            | client   | pagetitle |
            | facebook | Facebok   |


    @actual @validate-e2e @login
    Scenario Outline: Search - I am able to login in the web "<client>"
        Given I login the application for "<client>"
        When I get the page title
        And I login the application with details
            | userName   | password   |
            | <userName> | <password> |
        Then I verify details "<pagetitle>"
        @facebook
        Examples:
            | client   | pagetitle | userName | password |
            | facebook | Facebok   | test     | test     |

    @actual @validate-e2e @url
    Scenario Outline: Search - I am able to search in the web "<client>"
        Given I launch the application with "<url>" for "<client>"
        When I get the page title
       # Then I verify details "<pagetitle>"
        @google
        Examples:
            | client | url |
            | google | https://zenodo.org/records/14474160    |
            |google|https://www.int-jecse.net/article/AI+Chatbots+and+Emotional+Intelligence+Improving+Customer+Interactions_7321/|




