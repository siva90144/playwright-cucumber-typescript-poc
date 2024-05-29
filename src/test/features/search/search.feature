@pSearch @regression
Feature: Search - Verify end to end flow
    I want to verify Search flow

    @actual @validate-e2e @search
    Scenario Outline: Search - I am able to search in the web
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
            | facebook | Facebok  |


