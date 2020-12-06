const {enter_valid_credentials_and_click_on_login} = require("../../support/Pages/login")
const {navigate_to_homepage_check_site_logo_and_url} = require("../../support/Pages/login")
const {enter_content_details_and_save} = require("../../support/Pages/login")
const {check_the_create_content_button_is_displayed} = require("../../support/Pages/login")
const {verify_content} = require("../../support/Pages/login")
const {logout} = require("../../support/Pages/login")

describe ("Login into application with valid credentials", function(){
    before(function(){
        cy.visit("/");
    })

    it("Enter valid credentials and click on signin button" , function(){
        enter_valid_credentials_and_click_on_login();
    })

    it("Navigate to home page and check logo", function(){
        navigate_to_homepage_check_site_logo_and_url();
    })

    it("Check create content button is displayed or not", function(){
        check_the_create_content_button_is_displayed();
    })

    it("Add content details and click on save button" , function(){
        enter_content_details_and_save();
    })

    it("Verify created content on content view page", function(){
        verify_content();
    })
   
    it("Logout" , function(){
        logout();
    })
})