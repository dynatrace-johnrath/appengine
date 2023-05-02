import React from "react"
import { Flex, Paragraph, DQLEditor } from "@dynatrace/strato-components-preview"
import { useDQLQuery } from "../hooks/useDQLQuery";

type DataProps = {
    /**Biz Event Attribute */
    bizobj: string;
}


export const Data = ({bizobj}:DataProps) => {
    const initialQuery = "fetch logs \n| summarize count(), by:bin(timestamp, 1m)";

    return(
        <Flex >
            <Paragraph>{bizobj}</Paragraph>
            <DQLEditor value={initialQuery} />
        </Flex>
    );
}