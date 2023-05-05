import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading, useCurrentTheme } from "@dynatrace/strato-components-preview"
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { useDQLQuery } from "../hooks/useDQLQuery";
import { CardDQL } from '../components/CardDQL';

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}

const email = "dawn.meza@yahoo.com"
export const Data = ({bizobj}:DataProps) => { 
    //need to get the customers ID from email for the other queries
    console.log(bizobj)
    {/* example comment 
    const bizObj1 = "dawn.meza@yahoo.com"
    const helloWorld = `${"dawn.meza@yahoo.com"}`;
    const dqlString = "fetch bizevents | fields accountId, email | filter email == " + helloWorld + " | summarize value = takeFirst(accountId)"
    const [emailToId, isLoadingStarted] = useDQLQuery(
        "fetch bizevents | fields accountId, email | filter email ==  | summarize value = takeFirst(accountId)",
        //'fetch bizevents | fields accountId, email | filter email == ' + email + ' | summarize customerId = takeFirst(accountId)',
        //'fetch bizevents, timeframe:"2022-01-20T00:00:00Z/2023-04-29T17:00:00Z"  | filter event.type == "booking.process.started" | summarize value = count()',
      );
    const emailId = Number(emailToId?.records?.[0]?.value);
    */}
    const emailId = 100
    //onsole.log("emailId " + emailId)

 
    //const emailId = 100
    const [resultStarted, isLoadingFinsihed] = useDQLQuery(
        'fetch bizevents, from:now()-24hr | filter accountId == ' + emailId + ' | filter event.type == "easytrade.trade.buy" | summarize value = sum(amount)',
        //'fetch bizevents, timeframe:"2022-01-20T00:00:00Z/2023-04-29T17:00:00Z"  | filter event.type == "booking.process.started" | summarize value = count()',
      );
     
    const bookingStarted = Number(resultStarted?.records?.[0]?.value);

    return(
        <Flex>
            {/* <DQLEditor value={initialQuery} /> */}
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />

            </Grid>
        </Flex>
    );
}