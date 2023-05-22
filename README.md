# SGHotelly

##### ---This application was created in 2021 ---

## Purpose
### Problem Statement
In the Covid 19 situation, a global pandemic, Singapore’s travel & hotel sector has been hit hard. According to Straits Times, in February 2021, the tourism sector fell the lowest in the past 4 decades due to the restrictions of global travel and border closures. Due to Global restriction, the sales in the hotel industry also hit hard as not much foreign people come to book because of Covid 19.  It seems that it might also continue due to sudden increase in the community cases today. 

### Proposed Solution (MEAN Stack Web Application)

This web application I am building called SGHotelly aims to help the hotels in Singapore to continue operating their businesses in midst of this time. It also aims to help those who find staying in their houses disturbing or not a comfortable place for home-based work, a space to find peace and to have a feel of staying in hotels. Due to the current situation, all the administration and e-confirmation receipt will be done via online which is convenient. The web application will let users to see different hotels in different places in Singapore and can cancel the booking if they are not feeling well. This is an ultimately a win-win situation to deal with the current situation.

### Use Case Flows 
The image below will give an overall view of all the access to the features and the actors

![image](https://user-images.githubusercontent.com/94510297/157640552-03b50f16-c264-475a-827f-377b8622683b.png)

### Features
This is a web application named SGHotelly which helps to list all the hotels available using MongoDB and able to utilize CRUD request based on Role-Based-Authorization

This web application has a login/register functionality using JWT token,book & pay hotel using STRIPE technology to validate cards and payment(for developement sake, we use test cards), generates receipt using PDF.makejs to give a pdf of the booking receipt, and lastly have filter/sort hotels with the use of angular pipelines



