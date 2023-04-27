Ext.define('TextManipulationApp.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',
	onBackBtnClicked: function(btn){

		const resultContainer = this.lookup("resultContainer");
		const settingsContainer = this.lookup("settingsContainer");
		resultContainer.setHidden(true);
		settingsContainer.setHidden(false);
	},
	onCalculateSimilarityClicked : function()
	{

		const mainview = this.lookup("mainview");

		const languageCombo = this.lookup("languageCombo");
		const algorithmCombo = this.lookup("algorithmCombo");
		const firstTextArea = this.lookup("text-1");
		const secondTextArea = this.lookup("text-2");
		const resultContainer = this.lookup("resultContainer");
		const settingsContainer = this.lookup("settingsContainer");
		const outputCombo = this.lookup("outputCombo");
		const similarityScoreContainer = this.lookup("similarityScoreContainer");
		const similarityScoreExpContainer = this.lookup("similarityScoreExpContainer");
		const similarityScoreLabel = this.lookup("similarityScoreLabel");
		const similarityScoreExpLabel = this.lookup("similarityScoreExpLabel");

		console.log(outputCombo.getChecked().getValue());

		const isFormValid = this.getView().validate();
		if(!isFormValid)
			return;

		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Please Wait...'
		});
		

        Ext.Ajax.request({
			url: "http://localhost:5000/TextManipulation/checkSimilarity",
			method: 'POST',
			useDefaultXhrHeader : false,
			params: {
				language :languageCombo.getValue(),
				algorithm : algorithmCombo.getValue(),
				firstText: firstTextArea.getValue(),
				secondText: secondTextArea.getValue(),
				output : outputCombo.getChecked().getValue()
			},

			success: function(result, action, response) {
				var jsonData = Ext.decode(result.responseText);
				console.log("jsonData");
				console.log(jsonData);


				const outputType = outputCombo.getChecked().getValue();
				switch(outputType){
					case 1:
						similarityScoreContainer.setHidden(false);
						similarityScoreExpContainer.setHidden(true);
						similarityScoreLabel.setHtml('<h1 style="margin-bottom:20px;font-size:50px">'+jsonData.similarity_score+'</h1>');
	
						break;
					case 2:
						similarityScoreContainer.setHidden(true);
						similarityScoreExpContainer.setHidden(false);
						similarityScoreExpLabel.setValue(jsonData.similar_calculation_explination);
						
						break;
					default:
						similarityScoreExpContainer.setHidden(false);
						similarityScoreContainer.setHidden(false);
						similarityScoreLabel.setHtml('<h1 style="margin-bottom:20px;font-size:50px">'+jsonData.similarity_score+'</h1>');
						similarityScoreExpLabel.setValue(jsonData.similar_calculation_explination);

						break;
				}

				resultContainer.setHidden(false);
				settingsContainer.setHidden(true);

				Ext.Viewport.setMasked(false);

			   },

			   scope: this 
			   });
	
	},
	onTextArea1Changed:function(textArea)
	{
		const charsCount = textArea.getValue().length;
		const textArea1TotalChars = this.lookup('textArea1TotalChars');
		textArea1TotalChars.setHtml('<h3>Total Character(s) : '+charsCount+'/2000</h3>');
	},
	onTextArea2Changed:function(textArea)
	{
		const charsCount = textArea.getValue().length;
		const textArea1TotalChars = this.lookup('textArea2TotalChars');
		textArea1TotalChars.setHtml('<h3>Total Character(s) : '+charsCount+'/2000</h3>');
	}
});
