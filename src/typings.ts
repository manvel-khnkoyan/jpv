// jpv.ts

interface ErrFunc {
    (error: { value: any; pattern: string; path: string }): void;
  }
  
  interface PatternObject {
    [key: string]: Pattern;
  }
  
  interface StrictObject {
    strict: true;
    pattern: PatternObject;
  }
  
  interface AndObject {
    and: Pattern[];
  }
  
  interface OrObject {
    or: Pattern[];
  }
  
  interface NotObject {
    not: Pattern;
  }
  
  interface NullableObject {
    nullable: true;
    pattern: Pattern;
  }
  
  type Pattern = 
    | string
    | number
    | boolean
    | null
    | RegExp
    | PatternObject
    | Pattern[]
    | ((value: any) => boolean)
    | AndObject
    | OrObject
    | NotObject
    | NullableObject
    | StrictObject;
  
  export const isPlainObject = (obj: any): obj is object => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  
  export const strict = (pattern: PatternObject): StrictObject => ({ strict: true, pattern });
  
  export const and = (...conditions: Pattern[]): AndObject => ({ and: conditions });
  
  export const or = (...conditions: Pattern[]): OrObject => ({ or: conditions });
  
  export const not = (condition: Pattern): NotObject => ({ not: condition });
  
  export const nullable = (condition: Pattern): NullableObject => ({ nullable: true, pattern: condition });
  
  export const match = (value: any, pattern: Pattern, path: string, err: ErrFunc): boolean => {
      // Pattern logic...
  };
  
  export const validate = (obj: any, pattern: Pattern, err: ErrFunc = () => {}, path = '') => {
      // Validation logic...
  };
  
  