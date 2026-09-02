public class GetPersonalizationPoints {

    public class Result {
        @InvocableVariable(label='Personalization Points')
        public String personalizationPoints;
    }

    @InvocableMethod(label='Get Personalization Points' description='Returns all Personalization Points with Id, DeveloperName, and Description')
    public static List<Result> getPersonalizationPoints(List<String> requests) {
        List<PersonalizationPoint> points = [
            SELECT Id, DeveloperName, Description
            FROM PersonalizationPoint
        ];

        Result result = new Result();
        result.personalizationPoints = JSON.serialize(points);
        return new List<Result>{ result };
    }
}
