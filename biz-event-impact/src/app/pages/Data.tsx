import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading, useCurrentTheme } from "@dynatrace/strato-components-preview"
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { useDQLQuery } from "../hooks/useDQLQuery";
import { Card } from '../components/Card';

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}


export const Data = ({bizobj}:DataProps) => {
    const initialQuery = "fetch logs \n| summarize count(), by:bin(timestamp, 1m)";
    const theme = useCurrentTheme();

    return(
        <Flex style={{
            border: Colors.Border.Neutral.Default,
            borderRadius: Borders.Radius.Container.Subdued,
            background: Colors.Background.Surface.Default,
            boxShadow: BoxShadows.Surface.Raised.Rest,
            width: '400px',
            height: '120px',
            alignItems: "center",
            justifyContent: 'center',
          }}>
            <Paragraph>{bizobj}</Paragraph>
            {/* <DQLEditor value={initialQuery} /> */}
            <Grid gap={64} gridTemplateColumns={'2fr 2fr'}>
            
            </Grid>
            <Card
                href="/data"
                inAppLink
                imgSrc={theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"}
                name="Process results"
            /> 
            <Card
                href="/data"
                inAppLink
                imgSrc={theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"}
                name="Process results"
            /> 
            <Card
                href="/data"
                inAppLink
                imgSrc={theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"}
                name="Process results"
            /> 
        </Flex>
    );
}