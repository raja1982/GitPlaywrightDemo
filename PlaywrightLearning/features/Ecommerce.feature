Feature: Ecommerce validations
  @Regression
    Scenario: Placing the Order
      Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
      When Add "ZARA COAT 3" to Cart
      Then Verify "ZARA COAT 3" is diplayed in the Cart
      When Enter valid details and Place the Order
      Then Verify order is present in the OrderHistory page
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 applicaiton with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username           | password      | 
            | anshika@gmail.com  | Iamking@000   | 
            | hello@123.com      | Iamhello@12   |