import 'cypress-file-upload'
const loginPageObj = require("../PageObjects/login_page_elements");
const createContentPageObjects = require("../PageObjects/create_content_page_elements");
const contentData = require("../Utilities/Data.json")

const elt_logoimg = loginPageObj.sitelogo;
const elt_username = loginPageObj.username;
const elt_password = loginPageObj.password;
const elt_loginButton = loginPageObj.loginButton;

const elt_menuContent = createContentPageObjects.menuContent;
const elt_contentId = createContentPageObjects.txtContentId;
const elt_contentName = createContentPageObjects.txtContentName;
const elt_countryReg = createContentPageObjects.drpDwnCountryReg;
const elt_language = createContentPageObjects.drpDwnLanguage;
const elt_contentTitle = createContentPageObjects.txtContentTitle;
const elt_contentVersion = createContentPageObjects.txtContentVersion;
const elt_contentDescription = createContentPageObjects.txtContentDescription;
const elt_contentVersionDesc = createContentPageObjects.txtContentVersionDescription;
const elt_fileInputButton = createContentPageObjects.inputFile;
const elt_logout = loginPageObj.logoutLink;

const elt_listConId = createContentPageObjects.listConId;
const elt_listConName = createContentPageObjects.listConName;
const elt_listConVersion = createContentPageObjects.listConVersion;

var val = Math.floor(1000 + Math.random() * 9000)
  var contentId = contentData.contentId + val

let enter_valid_credentials_and_click_on_login = () => {
  cy.fixture('data.json').then((item) => {
    console.log(item.username);
    cy.get(elt_username).click().type(item.username)
    cy.get(elt_password).click().type(item.password)
    cy.get(elt_loginButton).click()
    cy.wait(5000)
  })
}

let navigate_to_homepage_check_site_logo_and_url = () => {
  cy.visit('https://admin.dev.zosilearning.com/courses')
  cy.get(elt_logoimg).scrollIntoView()
  cy.url().should('include', '//admin.dev.zosilearning.com/courses')    
}

let check_the_create_content_button_is_displayed = () => {
  cy.wait(5000)
  cy.visit('https://admin.dev.zosilearning.com/contents')
  cy.wait(5000)
  cy.contains("Create Content").should('be.visible')
}

let enter_content_details_and_save = () => { 
  cy.visit('https://admin.dev.zosilearning.com/contents')
  cy.get(elt_menuContent).click()
  cy.contains("Create Content").click()
  cy.wait(8000)
  cy.get(elt_contentId).type(contentId)
  cy.get(elt_contentName).type(contentData.contentName)
  cy.get(elt_countryReg).type('BR{downarrow}{enter}')
  cy.get(elt_language).type('AR-AE{downarrow}{enter}')
  cy.get(elt_contentTitle).type(contentData.contentTitle)
  cy.get(elt_contentVersion).type(contentData.contentVersion)
  cy.get(elt_contentDescription).type(contentData.contentDescription)
  cy.get(elt_contentVersionDesc).type(contentData.contentVersionDescription)
  cy.get(elt_fileInputButton).attachFile(contentData.filePath)
  cy.contains('Save').click()
  cy.log("Created content with Content ID - " + contentId)
}

let verify_content = () => {
  cy.wait(8000)
  cy.visit('https://admin.dev.zosilearning.com/contents')
  cy.wait(8000)
  cy.get(elt_listConId).contains(contentId).should('be.visible')
  cy.get(elt_listConName).contains(contentData.contentName).should('be.visible')
  cy.get(elt_listConVersion).contains(contentData.contentVersion).should('be.visible')
  cy.log("Content verified!!")
}

let logout = () => {
  cy.visit('https://admin.dev.zosilearning.com/contents')
  cy.get(elt_logout).click()
  cy.contains('Logout').click()
}
module.exports = {
  enter_valid_credentials_and_click_on_login,
  navigate_to_homepage_check_site_logo_and_url,
  check_the_create_content_button_is_displayed,
  enter_content_details_and_save,
  verify_content,
  logout
}