// index.d.ts

declare module 'jpv' {
    // Define a Pattern type that can be a primitive, a regular expression, an object, an array or a function
    type Pattern = 
      | string
      | number
      | boolean
      | null
      | RegExp
      | { [key: string]: Pattern }
      | Pattern[]
      | ((value: any) => boolean)
      | And
      | Or
      | Not
      | Nullable
      | Strict;
  
    interface And {
      and: Pattern[];
    }
  
    interface Or {
      or: Pattern[];
    }
  
    interface Not {
      not: Pattern;
    }
  
    interface Nullable {
      nullable: true;
      pattern: Pattern;
    }
  
    interface Strict {
      strict: true;
      pattern: Pattern;
    }
    
    export const strict: (pattern: Pattern) => Strict;
  
    export const and: (...conditions: Pattern[]) => And;
  
    export const or: (...conditions: Pattern[]) => Or;
  
    export const not: (condition: Pattern) => Not;
  
    export const nullable: (condition: Pattern) => Nullable;
  
    export function validate(
      obj: any,
      pattern: Pattern,
      path?: string,
      err?: (error: { value: any; pattern: string; path: string }) => void
    ): boolean;
  }
  
  