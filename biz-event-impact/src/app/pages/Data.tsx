import React from "react"
import { Flex, Paragraph, DQLEditor, Grid, Heading, useCurrentTheme } from "@dynatrace/strato-components-preview"
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { useDQLQuery } from "../hooks/useDQLQuery";
import { CardDQL } from '../components/CardDQL';

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}


export const Data = ({bizobj}:DataProps) => {
    const [resultStarted, isLoadingStarted] = useDQLQuery(
        'fetch bizevents, from:now()-24hr | filter accountId == 100 | filter event.type == "easytrade.trade.buy" | summarize value = sum(amount)',
        //'fetch bizevents, timeframe:"2022-01-20T00:00:00Z/2023-04-29T17:00:00Z"  | filter event.type == "booking.process.started" | summarize value = count()',
      );

    const bookingStarted = Number(resultStarted?.records?.[0]?.value);

    return(
        <Flex>
            <Paragraph>{bizobj}</Paragraph>
            {/* <DQLEditor value={initialQuery} /> */}
            <Grid gap={32} gridTemplateColumns={'2fr 2fr'}>
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingStarted}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingStarted}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingStarted}
                />
                <CardDQL
                    value={bookingStarted}
                    chartLabel="Amount bought (24hrs)"
                    chartSuffix=""
                    //chart precision is what decimal you want the result to show
                    chartPrecision={0}
                    isLoading={isLoadingStarted}
                />

            </Grid>
        </Flex>
    );
}