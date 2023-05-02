import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading } from "@dynatrace/strato-components-preview"
import { useDQLQuery } from "../hooks/useDQLQuery";
import { Card } from '../components/Card';

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}


export const Data = ({bizobj}:DataProps) => {
    const initialQuery = "fetch logs \n| summarize count(), by:bin(timestamp, 1m)";

    return(
        <Flex>
            <Paragraph>{bizobj}</Paragraph>
            <DQLEditor value={initialQuery} />


            <Heading level={1}>Bobby Voglers Booking Overview</Heading>
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                
            </Grid>
        </Flex>
    );
}