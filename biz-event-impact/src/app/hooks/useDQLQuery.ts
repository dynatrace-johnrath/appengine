import React from "react";
import { SingleValue, Flex } from '@dynatrace/strato-components-preview';
import { Borders, BoxShadows, Colors } from '@dynatrace/strato-design-tokens';
import { ProgressCircle } from '@dynatrace/strato-components-preview';

interface CardProps {
    value: number;
    chartLabel: string;
    chartSuffix: string;
    chartPrecision: number;
    isLoading: boolean;
  }

  export const CardDQL = ({ value, chartLabel, chartSuffix, chartPrecision, isLoading }: CardProps) => {

    return (
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
        {isLoading && <ProgressCircle />}
        {Number.isFinite(value) && (
          <SingleValue
            data={value}
            label={chartLabel}
          />
        )}
      </Flex>
    );
  };
