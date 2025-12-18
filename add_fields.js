<script runat="server">
Platform.Load("Core", "1.1.1");

var deNames = [
    "MCJourneyDataView",
    "MCJourneyActivityDataView",
    "MCSentDataView",
    "MCJobDataView",
    "MCUndeliverableSmsDataView",
    "MCSubscribersSmsDataView",
    "MCSubscribersDataView",
    "MCOpenDataView",
    "MCComplaintDataView",
    "MCClickDataView",
    "MCSmsSubscriptionLog",
    "MCSmsMessageTracking",
    "MCPushAddressDataView",
    "MCBounceDataView"
];

for (var i = 0; i < deNames.length; i++) {
    var deName = deNames[i];
    try {
        var de = DataExtension.Init(deName);
        
        var fieldConfig = {
            "Name": "BUName",
            "FieldType": "Text",
            "MaxLength": 255,
            "IsPrimaryKey": true,
            "IsRequired": true
        };

        var status = de.Fields.Add(fieldConfig);
        
        Write("DE: " + deName + " - Status: " + status + "<br>");
    } catch (e) {
        Write("Error on " + deName + ": " + e + "<br>");
    }
}
</script>
