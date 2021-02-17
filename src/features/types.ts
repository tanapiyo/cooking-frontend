export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
  /*authSlice.ts*/
  export interface PROPS_AUTHEN {
    email: string;
    password: string;
  }

  /*recipeSlice.ts*/
  export interface PROPS_NEWRECIPE {
    foodName: string;
    vegetables: number[];
    main: number[];
    recipeKind: number[];
    memo: string;
    ajitsuke: string;
    cookingTime: number;
    onomatopoeia: string;
  }

  /*diarySlice.ts*/

  export interface PROPS_NEWDIARY {
    foodName: string;
    date: Date | null;
    memo: string;
  }
  
  export interface PROPS_DIARY{
    foodName: string;
    date: Date | null;
    memo: string;
    userDiary: number;
  }