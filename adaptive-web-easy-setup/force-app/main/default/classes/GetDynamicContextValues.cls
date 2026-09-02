public class GetDynamicContextValues {

    public class DynamicContextValues {
        @InvocableVariable(label='Color')
        public List<String> color;

        @InvocableVariable(label='Age')
        public List<String> age;

        @InvocableVariable(label='Gender')
        public List<String> gender;

        @InvocableVariable(label='Category')
        public List<String> category;
    }

    public class Result {
        @InvocableVariable(label='Dynamic Context Values')
        public String dynamicContextValues;
    }

    @InvocableMethod(label='Get Dynamic Context Values' description='Returns unique values for Color, Age, Gender, and Category from the GoodsProduct DMO')
    public static List<Result> getFilterOptions(List<String> requests) {
        DynamicContextValues ctx = new DynamicContextValues();
        ctx.color = queryDistinctValues('ssot__ColorId__c');
        ctx.age = queryDistinctValues('ssot__AgeId__c');
        ctx.gender = queryDistinctValues('ssot__GenderId__c');
        ctx.category = queryDistinctValues('ssot__PrimaryProductCategory__c');

        Result result = new Result();
        result.dynamicContextValues = JSON.serialize(ctx);
        return new List<Result>{ result };
    }

    private static List<String> queryDistinctValues(String fieldName) {
        ConnectApi.CdpQueryInput input = new ConnectApi.CdpQueryInput();
        input.sql = 'SELECT DISTINCT ' + fieldName + ' FROM ssot__GoodsProduct__dlm WHERE ' + fieldName + ' IS NOT NULL';

        ConnectApi.CdpQueryOutputV2 output = ConnectApi.CdpQuery.queryAnsiSqlV2(input);

        List<String> values = new List<String>();
        if (output.done && output.rowCount > 0) {
            for (ConnectApi.CdpQueryV2Row row : output.data) {
                List<Object> rowData = (List<Object>) JSON.deserializeUntyped(JSON.serialize(row.rowData));
                if (!rowData.isEmpty() && rowData[0] != null) {
                    values.add(String.valueOf(rowData[0]));
                }
            }
        }
        return values;
    }
}
