import React from "react"
import { Flex, Grid, Heading, LoadingIndicator,TimeseriesChart } from "@dynatrace/strato-components-preview"
import { convertToTimeseries } from '@dynatrace/strato-components-preview/conversion-utilities'
import { useDQLQuery } from "../hooks/useDQLQuery";
import { CardDQL } from './CardDQL';

//Properties to pass into this component
type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}
//Component housing all our data
export const Data = ({bizobj}:DataProps) => { 
    //need to get the customers ID from email for the other queries
    
    //Const for easy testing
    //const userEmail = "dawn.meza@yahoo.com"

    //------------------Query 1--------------------//
    //Name: emailToId
    //Purpose: pass in user email to get the users ID for future queries
    //returns: Single number (ex: 56)

    //have to delcare the query before calling query function (single quote or double quote or ` does not matter...)
    //...only declaring this as a string before it is passed to the useDQLQuery() function

    //passing in bizobj to the query to get account ID
    const emailToIdDQL = `fetch bizevents 
    | fields accountId, email 
    | filter email == "` + bizobj + `" 
    | summarize value = takeFirst(accountId)`;
    //run the query
    const [emailToIdReturn, isLoadingStarted] = useDQLQuery(emailToIdDQL);
    //grab the number value from the query
    const emailToId = Number(emailToIdReturn?.records?.[0]?.value);

    
    //------------------Query 2--------------------//
    //Name: stocksPurchasedAmount
    //Purpose: use user ID from previous query to get dollar amount of stocks sold in the past 24hrs
    //returns: Single number (ex: 930)

    const stocksPurchasedAmountDQL = `fetch bizevents, from:now()-24hr 
        | filter accountId == ` + emailToId + ` 
        | filter event.type == "com.easytrade.buy.start" 
        | summarize value = sum(amount)`;
    //run the query
    const [stocksPurchasedAmountReturn, stocksPurchasedAmountIsLoading] = useDQLQuery(stocksPurchasedAmountDQL);
    //grab the number value from the query
    const stocksPurchasedAmount = Number(stocksPurchasedAmountReturn?.records?.[0]?.value);
    
    //------------------Query 3--------------------//
    //Name: stocksSoldAmount
    //Purpose: use user ID from previous query to get dollar amount of stocks sold in the past 24hrs
    //returns: Single number (ex: 930)

    const stocksSoldAmountDQL = `fetch bizevents, from:now()-24hr 
        | filter accountId == ` + emailToId + ` 
        | filter event.type == "com.easytrade.sell.start" 
        | summarize value = sum(amount)`;
    //run the query
    const [stocksSoldAmountReturn, stocksSoldAmountIsLoading] = useDQLQuery(stocksSoldAmountDQL);
    //grab the number value from the query
    const stocksSoldAmount = Number(stocksSoldAmountReturn?.records?.[0]?.value);

    //------------------Query 4--------------------//
    //Name: stocksPurchasedDollars
    //Purpose: use user ID from previous query to get sum dollar amount of stocks purchased in the past 24hrs
    //Returns: Single number (ex: 11,573)

    //another way of displaying DQL query using ` marks
    const stocksPurchasedDollarsDQL = `fetch bizevents, from:now()-24hr 
        | filter accountId == ` + emailToId + ` 
        | filter event.type == "com.easytrade.buy.start" 
        | summarize value = sum(amount * price)`;
    //run the query
    const [stocksPurchasedDollarsReturn, stocksPurchasedDollarsIsLoading] = useDQLQuery(stocksPurchasedDollarsDQL);
    //grab the number value from the query
    const stocksPurchasedDollars = Number(stocksPurchasedDollarsReturn?.records?.[0]?.value);
    
    //------------------Query 5--------------------//
    //Name: stocksSoldDollars
    //Purpose: use user ID from previous query to get sum dollar amount of stocks sold in the past 24hrs
    //returns: Single number (ex: 11,573)

    const stocksSoldDollarsDQL = `fetch bizevents, from:now()-24hr 
        | filter accountId == ` + emailToId + ` 
        | filter event.type == "com.easytrade.sell.start" 
        | summarize value = sum(amount * price)`;
    //run the query
    const [stocksSoldDollarsReturn, stocksSoldDollarsIsLoading] = useDQLQuery(stocksSoldDollarsDQL);
    //grab the number value from the query
    const stocksSoldDollars = Number(stocksSoldDollarsReturn?.records?.[0]?.value);

    //------------------Query 6--------------------//
    //Name: sellAmountChart
    //Purpose: returns a series of values of the amount of stocks sold over 24 hrs
    //returns: Timeseries of counts
    const sellAmountChartDQL = `fetch bizevents, from:now()-24hr 
    | filter accountId == ` + emailToId + `
    | filter event.type == "com.easytrade.sell.start" 
    | summarize value = sum(amount), by:{timestamp}`
    const [sellAmountChartReturn, sellAmountChartIsLoading] = useDQLQuery(sellAmountChartDQL);
    
    return(
        <Flex flexDirection="column" alignItems="center" padding={32}>
        <Heading>User Email: {bizobj}</Heading>
        { !isLoadingStarted ? <>
        {/* ---Query 1--- */}
        <Heading>User Id: {emailToId}</Heading>
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                {/* ---Query 2--- */}
               <CardDQL
                    value={stocksPurchasedAmount}
                    chartLabel="Amount purchased (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={2}
                    isLoading={stocksPurchasedAmountIsLoading}
                /> 
                {/* ---Query 3--- */}
                <CardDQL
                    value={stocksSoldAmount}
                    chartLabel="Amount sold (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={2}
                    isLoading={stocksSoldAmountIsLoading}
                />
                {/* ---Query 4--- */}
                <CardDQL
                    value={stocksPurchasedDollars}
                    chartLabel="Amount purchased in USD (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={2}
                    isLoading={stocksPurchasedDollarsIsLoading}
                />
                {/* ---Query 5--- */}
                <CardDQL
                    value={stocksSoldDollars}
                    chartLabel="Amount sold in USD (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={2}
                    isLoading={stocksSoldDollarsIsLoading}
                />
            </Grid>
            <TimeseriesChart data={convertToTimeseries(sellAmountChartReturn?.records||[],sellAmountChartReturn?.types||[]) } gapPolicy="connect"/>
            </> : <LoadingIndicator/>}
        </Flex>
    );
}