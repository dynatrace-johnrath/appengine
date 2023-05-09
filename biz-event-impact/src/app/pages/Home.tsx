import React,{useState} from "react";
import { Flex, Heading, Paragraph, FormField, TextInput, useCurrentTheme, RunQueryButton, Button } from "@dynatrace/strato-components-preview";
import { ToastContainer,showToast } from "@dynatrace/strato-components-preview";
import { Data } from "./Data";


export const Home = () => {
  const theme = useCurrentTheme();
  const [email,setEmail] = useState('');
  const [visable,setVisable] = useState(false);

  function clickEvent(e) {
    if (email == ''){
      setVisable(false);
      showToast({
        title: 'Error',
        type: 'warning',
        message: 'Email must not be empty',
        lifespan: 1000
      });
    }
    else
      setVisable(true);
  };
  
  function resetEvent (e){
    setVisable(false);
    setEmail('');
  };

  return (
    <>
    <ToastContainer />

    <Flex flexDirection="column" alignItems="center" padding={32}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
        style={{ paddingBottom: 32 }}
      ></img>

      <Heading>Dynatrace Non-Named Biz Event Impact Anaylsis App</Heading>
      <Paragraph>
        This app is designed to assist a new App developer better understand the basics of the application 
      </Paragraph>
      <Paragraph>To run the app please enter an email address below</Paragraph>
      <Flex>
          <FormField label="">
            {!visable ?<TextInput placeholder="john.smith@dynatraceapps.com" value={email} onChange={setEmail} /> :<TextInput readOnly value={email}/>}
          </FormField>
          {!visable ? <Button onClick={clickEvent} color="primary" variant="accent">Understand my Trades</Button> : <Button onClick={resetEvent} color="primary" variant="accent">Reset</Button>}
      </Flex>

    </Flex>
    {visable ? <Data bizobj={email} loading={true}/> : <></>}
    </>
  );
};
