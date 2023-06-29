import React,{useState} from "react";
import { Flex, Heading, Paragraph, FormField, TextInput, Button } from "@dynatrace/strato-components-preview";
import { ToastContainer,showToast } from "@dynatrace/strato-components-preview";
import { Data } from "./components/Data";

export const App = () => {
  //Variables to be used for this page
  const [email,setEmail] = useState('');
  const [visable,setVisable] = useState(false);

  //call back function for user lookup
  function clickEvent(e) {
    //basic text validation
    //TODO - refine and ensure that we have what we are looking for
    if (email == ''){
      //ensure Data component is not visable
      setVisable(false);
      //Display toast from Strato Design System showcasing error
      showToast({
        title: 'Error',
        type: 'warning',
        message: 'Email must not be empty',
        lifespan: 1000
      });
    }
    else
      setVisable(true); //Display data object as email is entered
  };
  
  //callback function for reset button
  function resetEvent (e){
    //remove data object
    setVisable(false);
    //clear email address for fresh input
    setEmail('');
  };

  return (
    <>
    {/* Added ToastContainer to help with error handling in callback functions */}
    <ToastContainer />
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
        style={{ paddingBottom: 32 }}
      ></img> 
      <Heading>Dynatrace Non-Named Biz Event Impact Analysis App</Heading>
      {/* Leverage visible variable to ensure the proper copy is displayed to the end user */}
      {!visable ? <>
      <Paragraph>
        This app is designed to assist a new App developer better understand the basics of the application 
      </Paragraph>
      <Paragraph>To run the app please enter an email address below</Paragraph>
      </>  : <Paragraph>Click the Button to search for a new user</Paragraph> }
      <Flex flexDirection="initial" alignItems="self-end">
          <FormField label="">
            {/* if the data is visable ensure that users cannot edit the FormField */}
            {/* Could have looked at moving the setEmail to my clickEvent handler instead of locking the field */}
            {!visable ?<TextInput placeholder="john.lagona@dtinside.com" value={email} onChange={setEmail} /> 
            :<TextInput readOnly value={email}/>}
          </FormField>
          {/* Change which button to use depending on if data is currently shown */}
          {!visable ? <Button onClick={clickEvent} color="primary" variant="accent">Understand My Trades</Button> 
          : <Button onClick={resetEvent} color="primary" variant="accent">Reset</Button>}
      </Flex>

    </Flex>
    {visable ? <Data bizobj={email}/> : <></>}
    </>
  );
};
