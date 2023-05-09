import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading, useCurrentTheme } from "@dynatrace/strato-components-preview"
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { useDQLQuery } from "../hooks/useDQLQuery";
import { CardDQL } from '../components/CardDQL';
import { Header } from "@dynatrace/strato-components-preview/layouts/page/Header";

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
    loading: boolean;
}

const email = "dawn.meza@yahoo.com"
export const Data = ({bizobj, loading}:DataProps) => { 
    //need to get the customers ID from email for the other queries
    
    //still using static email for now
    const userEmail = "dawn.meza@yahoo.com"



    //------------------Query 1--------------------//
    //Name: emailToId
    //Purpose: pass in user email to get the users ID for future queries
    //returns: Single number (ex: 56)

    //have to delcare the query before calling query function (single quote or double quote or ` does not matter...)
    //...only declaring this as a string before it is passed to the useDQLQuery() function

    //passing in userEmail to the query to get account ID
    const emailToIdDQL = `fetch bizevents | fields accountId, email | filter email == "` + userEmail + `" | summarize value = takeFirst(accountId)`;
    //run the query
    const [emailToIdReturn, isLoadingStarted] = useDQLQuery(emailToIdDQL);
    //grab the number value from the query
    const emailToId = Number(emailToIdReturn?.records?.[0]?.value);

    //------------------Query 2--------------------//
    //Name: stocksPurchased
    //Purpose: use user ID from previous query to get dollar amount of stocks purchased in the past 24hrs
    //Returns: Single number (ex: 11,573)

    //another way of displaying DQL query using ` marks
    const stocksPurchasedDQL = `fetch bizevents, from:now()-24hr 
        | filter accountId == ` + emailToId + ` 
        | filter event.type == "easytrade.trade.buy" 
        | summarize value = sum(amount)`;
    //run the query
    const [stocksPurchasedReturn, isLoadingFinsihed] = useDQLQuery(stocksPurchasedDQL);
    //grab the number value from the query
    const stocksPurchased = Number(stocksPurchasedReturn?.records?.[0]?.value);
    
    //------------------Query 3--------------------//
    //Name: 
    //Purpose: 
    //returns:




    return(
        <Flex flexDirection="column" alignItems="center" padding={32}>
        {/* Adding user ID (email in the future) to the page */}
        <Heading>User Email: {userEmail}</Heading>
        <Heading>User Id: {emailToId}</Heading>
            
            {/* <DQLEditor value={initialQuery} /> */}
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                <CardDQL
                    value={stocksPurchased}
                    chartLabel="Amount of stocks bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={2}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={stocksPurchased}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={stocksPurchased}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingFinsihed}
                />
                <CardDQL
                    value={stocksPurchased}
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