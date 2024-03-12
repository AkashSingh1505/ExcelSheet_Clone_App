package com.akash.excelsheet

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.fragment.app.Fragment

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        openTableWebView(findViewById(R.id.table_webview))
    }

    private fun openTableWebView(tableWebView:WebView) {
        val webView: WebView = tableWebView
        webView.webViewClient= WebViewClient()
        // Enable JavaScript (optional)
        val webSettings = webView.settings
        webSettings.javaScriptEnabled = true
        WebView.setWebContentsDebuggingEnabled(true)
        var jsInterface = MyJavaScriptInterface(this)
        webView.addJavascriptInterface(jsInterface,"AndroidInterface")
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        webView.loadUrl("file:///android_asset/table.html")
    }

}