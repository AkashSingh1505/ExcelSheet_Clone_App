package com.akash.excelsheet

import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast
import com.google.gson.Gson

class MyJavaScriptInterface(val activity: MainActivity) {
    @JavascriptInterface
    fun close(){
        activity.finish()
        Toast.makeText(activity,"clossing", Toast.LENGTH_SHORT).show()
    }
    @JavascriptInterface
    fun dataSave(json:String){
        Log.d("LogMSZ",json)
        val gson = Gson()
        val jsonArray = gson.fromJson(json, ArrayList::class.java)

        val result = jsonArray.map{entry->
            val innerArray = entry as List<*>
            val key = innerArray[0] as String
            val value = innerArray[1] as Map<*,*>
            Pair(key,value)

        }
        result.forEach { (key, value) ->
            println("Key: $key")
            println("Value: ${value.get("text")}")
        }
        Toast.makeText(activity,"saved", Toast.LENGTH_LONG).show()
        activity.finish()

    }
}