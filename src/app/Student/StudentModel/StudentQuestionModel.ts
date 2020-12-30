export class StudentQuestionBM {
    CurrentUserId: number;
    TestId: number;
    CurrentSetId: number;
    CurrentSetName: string;
    NextSetId?: number;
    NextTypeName: string;
    NextTypeId?: number;
    CurrentSetStatus: string;
    IsScordBoardDisplay: boolean;
    IsQuestionDisplay: boolean;
    TotalQuestion: number;
    CompletedQuestion: number;
    IsShowNextButton: boolean;
    IsShowSubmitButton: boolean;
    IsShowGoToNextSetButton: boolean;
    LastQuestionId: number;
    NextQuestion: number;
    PrevQuestion: number;
    lstQuestionModel: StudentQuestion[];
    ScoreBoard: StudentTypeModel[];
    IsTestComplete: boolean;
    lstSubType: StudentQuestionSubType[];
}

export class StudentQuestion {
    TestQuestionId: number;
    QuestionId: number;
    Question: string;
    QuesId: string;
    TypeId?: number;
    ResponseTypeId?: number;
    ResponseValue?: number;
    lstQuestionRes: StudentQuestionResponse[];
    ImpactScore?: number;
    TestId?: number;
    Rating : number;
}

export class StudentQuestionResponse {
    ResponseId: number;
    ResponseText: string;
    Weight: number;
    SubTypeId:number;
    SubTypeName : string;
    ResponseNumber:number;
   
}

export class StudentTypeModel {
    TypeId: number;
    TypeName: string;
    Score: number;
    ColorCode: string;
}

export class StudentQuestionSubType {
    SubTypeId: number;
    SubTypeName: string;
    TypeId: number
}

export class StudentQuestionSetStatusCode {
    SetId: number
    SetName: string;
    PartialSetName : string;
    StatusCode: string;
    CompletePercentage: string;
}

export class StudentScoreModelForImg {
    ImgByte: string;
    ModuleId: number;
    TestId: number;
}