import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    checkPin(pin: string): Promise<boolean>;
    getPortfolio(): Promise<string>;
    savePortfolio(newPortfolio: string, pin: string): Promise<boolean>;
}
