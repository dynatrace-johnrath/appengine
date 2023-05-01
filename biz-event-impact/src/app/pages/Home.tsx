import React from "react";
import { Flex, Heading, Paragraph, FormField, TextInput, useCurrentTheme, Button } from "@dynatrace/strato-components-preview";



export const Home = () => {
  const theme = useCurrentTheme();


  return (
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
          <FormField label="Email">
          <TextInput placeholder="john.smith@dynatraceapps.com" />
          </FormField>
          <Button variant="emphasized">
            <Button.Label>Email Lookup</Button.Label>
          </Button>
      </Flex>
  
    </Flex>
  );
};
