/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GemUpdateFormInputValues = {
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    owner?: string;
};
export declare type GemUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    images?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GemUpdateFormOverridesProps = {
    GemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GemUpdateFormProps = React.PropsWithChildren<{
    overrides?: GemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gem?: any;
    onSubmit?: (fields: GemUpdateFormInputValues) => GemUpdateFormInputValues;
    onSuccess?: (fields: GemUpdateFormInputValues) => void;
    onError?: (fields: GemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GemUpdateFormInputValues) => GemUpdateFormInputValues;
    onValidate?: GemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GemUpdateForm(props: GemUpdateFormProps): React.ReactElement;
