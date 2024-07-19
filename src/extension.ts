import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension1.fetchData', async () => {
    vscode.window.showInformationMessage('Fetching data from Groq API...');
    console.log('Fetching data from Groq API...');

    try {
      const response = await axios.get('https://api.groq.com/data', {
        headers: {
          'Authorization': 'Bearer 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'
        }
      });
      console.log('Response received:', response);
      const data = response.data;
      vscode.window.showInformationMessage(`Data fetched: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error caught:', error);
      
      let errorMessage = 'An unknown error occurred';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`;
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = `No response received: ${error.message}`;
          console.error('Request error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = `Request setup error: ${error.message}`;
          console.error('Error:', error.message);
        }
      } else {
        // Not an Axios error
        errorMessage = `Unexpected error: ${error}`;
        console.error('Unexpected error:', error);
      }

      vscode.window.showErrorMessage(errorMessage);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
