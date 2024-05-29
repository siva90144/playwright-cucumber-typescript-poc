import { request } from "@playwright/test";
import Constants from "./Constants";
import { parse } from "jsonc-parser";
import { LocalDateTime, DateTimeFormatter } from "js-joda";

export default class Util {
  public static formatStringValue(str: string, replaceValue: any): string {
    for (const [key, value] of Object.entries(replaceValue)) {
      str = str.split(`{${key}}`).join(`"${value}"`);
    }
    return str;
  }

  public static splitString(inputString: string, splitBy: string): string[] {
    return inputString.split(splitBy);
  }

 

  public static getAlphaNumericString(length: number): string {
    const characters = Constants.RANDOM_STRING;
    let value = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      value += characters.charAt(randomIndex);
    }
    return value;
  }

  public static updateJsonData(
    jsonTxt: any,
    updateValues: { [key: string]: string }
  ): string {
    const object = parse(jsonTxt) as Record<string, any>;
    const keyValues: Set<[string, any]> = new Set();
    this.updateAllKeysValues(keyValues, object, updateValues, new Set());
    console.log("Updated Json is : " + JSON.stringify(object, null, 2));
    return JSON.parse(JSON.stringify(object));
  }

  private static updateAllKeysValues(
    keyValues: Set<[string, any]>,
    object: Record<string, any>,
    updateValues: { [key: string]: string },
    hashSet: Set<string>
  ): void {
    Object.entries(object).forEach((entry: [string, any]) =>
      keyValues.add(entry)
    );
    keyValues.forEach((entry: [string, any]) => {
      const k = entry[0];
      if (updateValues[k] !== undefined && !hashSet.has(k)) {
        console.log("match : " + k);
        object[k] = updateValues[k];
        hashSet.add(k);
      }
    });
    Object.entries(object)
      .filter((entry) => typeof entry[1] === "object")
      .forEach((entry: [string, any]) => {
        if (Array.isArray(entry[1])) {
          entry[1].forEach((subEntry: any) =>
            this.updateAllKeysValues(keyValues, subEntry, updateValues, hashSet)
          );
        } else {
          this.updateAllKeysValues(keyValues, entry[1], updateValues, hashSet);
        }
      });
  }

  public static isNullOrEmptyString(value: string): boolean {
    return value === null || value.trim() === "";
  }

  public static getDate(value: string, dateFormat: string): string {
    let date: LocalDateTime | null = null;
    let dateTimeFormatter: DateTimeFormatter;
    dateFormat = this.isNullOrEmptyString(dateFormat)
      ? "yyyy-MM-dd"
      : dateFormat;
    const currentDate: LocalDateTime = LocalDateTime.now();
    switch (value) {
      case "Year":
        date = currentDate.minusYears(1);
        break;
      case "Yesterday":
        date = currentDate.minusDays(1);
        break;
      case "Today":
      default:
        date = currentDate;
    }
    dateTimeFormatter = DateTimeFormatter.ofPattern(dateFormat);
    return date!.format(dateTimeFormatter);
  }
  public static updateKey(
    data: Map<string, string>,
    oldKey: string,
    newKey: string
  ): void {
    if (data.has(oldKey)) {
      let value = data.get(oldKey) || "";
      value = value.replace(/^"(.*)"$/, "$1");
      data.delete(oldKey);
      data.set(newKey, value!);
    } else {
      console.log(`Key '${oldKey}' does not exist.`);
    }
  }
  public static convertToCamelCase(input: string): string {
    const lowerCaseInput = input.toLowerCase();
    return lowerCaseInput
      .replace(/_([a-z])/g, (_, char) => char.toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase());
  }
}
