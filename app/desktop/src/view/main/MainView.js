Ext.define('TextManipulationApp.view.main.MainView', {
	extend: 'Ext.form.Panel',
	xtype: 'mainview',
	id:'mainview',
	reference:'mainview',
	controller: 'mainviewcontroller',
	cls: 'mainview',
	bodyCls: 'mainview-body',
	viewModel: {
		type: 'mainviewmodel'
	},
	layout: 'fit',

	items:[
		{
			xtype:'container',
			layout: 'vbox',
			flex : 1,
			items: [
			{
				xtype: 'container',
				flex:1,
                layout: {
                    type: 'vbox',
                    pack: 'center',
					align: 'center'
                },
                items: [{
					xtype: 'label',
					html : '<h1 style="font-size:20px;margin:0 0 10px 0;font-size:34px">Text Similarity Check</h1>',
				},{
					xtype: 'label',
					html : '<p style="font-size:15px;margin:5px 0 0 0">By using this tool , you can check the similarity between two texts, to start first add two texts inside the following text areas </p>',
					margin: '0 0 10px 0',
					style : 'border-bottom: 1px solid #e2e2e2;padding-bottom:10px'
				}]
			},{
				xtype:'panel',
				layout: 'vbox',
				flex : 7,
				style : 'background : white',
				padding : '50px',
				hidden : true,
				items:[]
			},{
				xtype:'panel',
				layout: 'vbox',
				flex : 7,
				style : 'background : white',
				padding : '50px',
				items:[
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'center',
						align: 'center'
					},
					items: [
					{
						xtype : 'container',
						layout : 'vbox',
						flex : 1,

						items:[{
							xtype: 'label',
							html: '<h2 style="margin:0;font-size:16px">Language</h1>',
						},{
							xtype: 'label',
							html: '<p style="font-size:13px;margin:10px 0 0 0">Choose the language that you want to check</p>',
	
						}]
	
					},{
						xtype: 'combobox',
						label : 'Language',
						reference:'languageCombo',
						required : true,
						requiredMessage : 'this field is required',
						forceSelection  : true,
						store: {
							fields: ['key', 'value'],
							data : [
								{"key":"English", "value":"en"},
								{"key":"German", "value":"de"},
							]
						},
						itemId: 'save',
						margin : '0 0 15px 0',
						displayField: 'key',
						valueField: 'value',
						flex: 1
					}]
				},{
					xtype:'panel',
					layout: 'hbox',
					flex: 1,
					layout: 'fit',
					items: [
						{
							xtype: 'panel',
							layout: 'vbox',
							title : 'Text 1 Enter Text for Comparison',
							margin : '0 10px 0 0',
							bodyStyle : 'background-color:#f3f4f5;padding:5px',
							items: [
								{
									xtype     : 'textareafield',
									grow      : true,
									name      : 'text-1',
									reference : 'text-1',
									required: true,
									requiredMessage:'this field is required',
									maxLength: 2000,
									flex : 1,
									listeners:{
										change: 'onTextArea1Changed'
									}
								},{
									xtype: 'label',
									reference: 'textArea1TotalChars',
									html : '<h3>Total Character(s) : 0/2000</h3>'
								}
							]
						},
						{
							xtype:'panel',
							layout: 'vbox',
							title : 'Text 2 Enter Text for Comparison',
							margin : '0 10px 0 0',
							bodyStyle : 'background-color:#f3f4f5;padding:5px',
							items: [
								{
									xtype     : 'textareafield',
									grow      : true,
									name      : 'text-2',
									reference : 'text-2',
									required: true,
									requiredMessage:'this field is required',
									maxLength: 2000,
									flex: 1,
									listeners:{
										change: 'onTextArea2Changed'
									}
								},{
									xtype: 'label',
									reference: 'textArea2TotalChars',
									html : '<h3>Total Character(s) : 0/2000</h1>'
								}
							]
						}
					]
				},{
					xtype : 'container',
					layout : 'vbox',
					flex : 1,
					itemId : 'resultContainer',
					reference : 'resultContainer',
					hidden: true,
					items : [
					{
					xtype: 'container',
					layout : {
						type:'hbox',
					},
					style:'margin:10px',
					flex : 1,
					items : [
					{
						xtype : 'container',
						layout : 'vbox',
						reference: 'similarityScoreContainer',
						flex : 1,
						items : [{
							xtype :'label',
							html: '<h2 style="font-size:16px;">Similarity score:</h2>',
						},{

							xtype : 'container',
							flex : 1,
							layout : {
								type:'vbox',
								pack :'center',
								align: 'center'
							},
							items : [{
								xtype : 'label',
								reference: 'similarityScoreLabel',
								html : '<h1 style="margin-bottom:20px;font-size:50px">60.60%</h1>',
							},{
								xtype : 'label',
								html : '<p style="margin:0;font-size:16px;">Similarity</p>',
							}]
						}]

					},{
						xtype : 'container',
						layout : 'vbox',
						reference: 'similarityScoreExpContainer',
						flex : 1,
						items : [{
							xtype :'label',
							html: '<h2 style="font-size:16px;">Similarity score explination:</h2>',
						},{
							xtype     : 'textareafield',
							grow      : true,
							flex : 1,
							reference: 'similarityScoreExpLabel',
							style : 'background-color:#f3f4f5;padding:5px',
							editable : false,
							value : 'bla bla bla bla bla blabla bla blabla bla bla',
						
						}]

					}
				]
					},{
						xtype: 'container',
						layout: {
							type: 'hbox',
							pack: 'center'
						},
						style : 'margin-top:20px',
						items: [{
							xtype: 'button', 
							ui: 'action',
							itemId: 'backBtn',
							width: '20%',
							height : '50px',
							text: 'Back',
							handler: 'onBackBtnClicked'
						}]
					}]
				},{
					xtype: 'container',
					layout : 'vbox',
					id: 'settingsContainer',
					itemId : 'settingsContainer',
					reference:'settingsContainer',
					flex : 1,
					hidden : false,
					items:[{
							xtype: 'label',
							html : '<b style="font-size:20px;">Settings:</b>',
							margin: '10px 0 0 0',
	
						}, {
							xtype:'container',
							layout: 'vbox',
		
							items : [				
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'center',
									align: 'center'
								},
								items: [
								{
									xtype : 'container',
									layout : 'vbox',
									flex : 1,
									items:[{
										xtype: 'label',
										html: '<h2 style="margin:0;font-size:16px">Algorithms</h1>',
									},{
										xtype: 'label',
										html: '<p style="font-size:13px;margin:10px 0 0 0">Choose the algorithm that you want to check your texts</p>',
				
									}]
				
								},{
									xtype: 'combobox',
									label : 'Algorithm',
									reference : 'algorithmCombo',
									required : true,
									requiredMessage : 'this field is required',
									store: {
										fields: ['key', 'value'],
										data : [
											{"key":"Algorithm 1", "value":1},
											{"key":"Algorithm 2", "value":2},
											{"key":"Algorithm 3", "value":3},
											{"key":"Algorithm 4", "value":4},
										]
									},
									itemId: 'save',
									margin : '0 0 15px 0',
									displayField: 'key',
									valueField: 'value',
									flex: 1
								}]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'center',
									align: 'center'
								},
								items: [
								{
									xtype : 'container',
									layout : 'vbox',
									flex : 1,
									items:[{
										xtype: 'label',
										html: '<h2 style="margin:0;font-size:16px">Output</h1>',
									},{
										xtype: 'label',
										html: '<p style="font-size:13px;margin:10px 0 0 0">Choose the type of the output</p>',
				
									}]
				
								},{
									xtype: 'radiogroup',
									vertical: true,
									flex: 1,
									cls:'x-field x-label-align-right',
									reference : 'outputCombo',
									items:[
										{ boxLabel: 'Similarity score only', name: 'output', value: 1 },
										{ boxLabel: 'Similarity calculation explanation only', name: 'output', value: 2 },
										{ boxLabel: 'Both', name: 'output', value: 3, checked: true },
									]
								}]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'center'
								},
								style : 'margin-top:20px',
								items: [{
									xtype: 'button', 
									ui: 'action',
									itemId: 'calculateSimBtn',
									width: '20%',
									height : '50px',
									text: 'Calculate Simialrity',
									handler: 'onCalculateSimilarityClicked'
								}]
							}]
						}]
				},]
			},]
		},

	]

});
