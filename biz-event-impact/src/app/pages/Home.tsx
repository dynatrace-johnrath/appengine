import React,{useState} from "react";
import { Flex, Heading, Paragraph, FormField, TextInput, useCurrentTheme, RunQueryButton, Button } from "@dynatrace/strato-components-preview";
import { ToastContainer,showToast } from "@dynatrace/strato-components-preview";
import {Card} from '../components/Card'
import { Data } from "./Data";


export const Home = () => {
  const theme = useCurrentTheme();
  const [email,setEmail] = useState('');
  const [visable,setVisable] = useState(false);

  function event(e) {
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
      <Paragraph>To get started please enter an email address below</Paragraph>
      <Flex>
          <FormField label="">
            <TextInput placeholder="john.smith@dynatraceapps.com" value={email} onChange={setEmail} />
          </FormField>
          <Button onClick={event} color="primary" variant="accent">CLICK ME!!</Button>
      </Flex>

    </Flex>
    {visable ? <Data bizobj={email}/> : <></>}
    </>
  );
};
