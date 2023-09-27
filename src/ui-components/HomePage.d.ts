/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HomePageInputValues = {
    name?: string;
    dateOfBirth?: string;
    country?: string;
    state?: string;
    district?: string;
    age?: number;
};
export declare type HomePageValidationValues = {
    name?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    district?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HomePageOverridesProps = {
    HomePageGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    district?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HomePageProps = React.PropsWithChildren<{
    overrides?: HomePageOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HomePageInputValues) => HomePageInputValues;
    onSuccess?: (fields: HomePageInputValues) => void;
    onError?: (fields: HomePageInputValues, errorMessage: string) => void;
    onChange?: (fields: HomePageInputValues) => HomePageInputValues;
    onValidate?: HomePageValidationValues;
} & React.CSSProperties>;
export default function HomePage(props: HomePageProps): React.ReactElement;
