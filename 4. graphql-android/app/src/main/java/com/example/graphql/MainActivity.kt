package com.example.graphql

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.exception.ApolloException
import com.example.AddStudentMutation
import com.example.StudentsQuery

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        apolloClient.query(StudentsQuery(1)).enqueue(object: ApolloCall.Callback<StudentsQuery.Data>() {
            override fun onResponse(response: Response<StudentsQuery.Data>) {
                Log.i("success", response.data?.students.toString());
            }

            override fun onFailure(e: ApolloException) {
                Log.e("fail", e.message, e);
            }
        })

        apolloClient.mutate(AddStudentMutation(classNum=3)).enqueue(object: ApolloCall.Callback<AddStudentMutation.Data>() {
            override fun onFailure(e: ApolloException) {
                Log.e("fail", e.message, e);
            }

            override fun onResponse(response: Response<AddStudentMutation.Data>) {
                Log.i("success", response.toString());
            }
        })
    }
}