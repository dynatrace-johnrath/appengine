import React from "react"
import { Flex, Paragraph, DQLEditor } from "@dynatrace/strato-components-preview"
import { useDQLQuery } from "../hooks/useDQLQuery";



export const Data = () => {
    const initialQuery = "fetch logs \n| summarize count(), by:bin(timestamp, 1m)";

    return(
        <Flex >
            <Paragraph>notes</Paragraph>
            <DQLEditor value={initialQuery} />
        </Flex>
    );
}