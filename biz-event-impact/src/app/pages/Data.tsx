import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading, useCurrentTheme } from "@dynatrace/strato-components-preview"
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { useDQLQuery } from "../hooks/useDQLQuery";
import { CardDQL } from '../components/CardDQL';
import { Header } from "@dynatrace/strato-components-preview/layouts/page/Header";

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}

const email = "dawn.meza@yahoo.com"
export const Data = ({bizobj}:DataProps) => { 
    //need to get the customers ID from email for the other queries
    
    //still using static email for now
    const userEmail = "dawn.meza@yahoo.com"

    //have to delcare the query before calling query function
    //passing in userEmail to the query
    const emailToId = `fetch bizevents | fields accountId, email | filter email == "` + userEmail + `" | summarize value = takeFirst(accountId)`;
    
    //run the query
    const [emailQuery, isLoadingStarted] = useDQLQuery( emailToId, );
    //turn the query result into a const number
    const emailQueryId = Number(emailQuery?.records?.[0]?.value);
    //use returned userId result in the next query
    //
    const [resultStarted, isLoadingFinsihed] = useDQLQuery(
        'fetch bizevents, from:now()-24hr | filter accountId == ' + emailQueryId + ' | filter event.type == "easytrade.trade.buy" | summarize value = sum(amount)',
        //'fetch bizevents, timeframe:"2022-01-20T00:00:00Z/2023-04-29T17:00:00Z"  | filter event.type == "booking.process.started" | summarize value = count()',
      );
    //return result of previous query as a number
    const bookingStarted = Number(resultStarted?.records?.[0]?.value);

    return(
        <Flex flexDirection="column" alignItems="center" padding={32}>
        {/* Adding user ID (email in the future) to the page */}
        <Heading>User Email: {userEmail}</Heading>
        <Heading>User Id: {emailQueryId}</Heading>
            
            {/* <DQLEditor value={initialQuery} /> */}
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount of stocks bought (24hrs)"
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