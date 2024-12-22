:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_error)).

:- set_setting(http:cors, [*]).

% Define server routes
:- http_handler('/diagnose', handle_diagnosis, []).

% Start the server
server(Port) :-
    http_server(http_dispatch, [port(Port)]).

handle_diagnosis(Request) :-
    option(method(options), Request), !,
    cors_enable(Request,
                [ methods([get,post,delete])
                ]),
    format('~n').
% Diagnosis route handler
handle_diagnosis(Request) :-
    cors_enable,
    http_read_json_dict(Request, DictIn), % Parse JSON input
    (   _{patient: Patient, symptoms: Symptoms} :< DictIn
    ->  diagnose(Symptoms, Diagnosis),
        reply_json_dict(_{patient: Patient, diagnosis: Diagnosis})
    ;   reply_json_dict(_{error: "Invalid input format"})
    ).

% Diagnosis logic
diagnose(Symptoms, Diagnosis) :-
    Symptoms.fever == true,
    Symptoms.headache == true,
    Symptoms.runny_nose == true,
    Symptoms.rash == true, !,
    Diagnosis = "german_measles".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.headache == true,
    Symptoms.sneezing == true,
    Symptoms.sore_throat == true,
    Symptoms.runny_nose == true,
    Symptoms.chills == true, !,
    Diagnosis = "common_cold".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.cough == true,
    Symptoms.sneezing == true,
    Symptoms.runny_nose == true, !,
    Diagnosis = "measles".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.fever == true,
    Symptoms.headache == true,
    Symptoms.body_ache == true,
    Symptoms.conjunctivitis == true,
    Symptoms.chills == true,
    Symptoms.sore_throat == true,
    Symptoms.runny_nose == true,
    Symptoms.cough == true, !,
    Diagnosis = "flu".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.fever == true,
    Symptoms.swollen_glands == true, !,
    Diagnosis = "mumps".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.fever == true,
    Symptoms.chills == true,
    Symptoms.body_ache == true,
    Symptoms.rash == true, !,
    Diagnosis = "chicken_pox".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.nausea == true,
    Symptoms.vomiting == true,
    Symptoms.diarrhea == true,
    Symptoms.fatigue == true, !,
    Diagnosis = "food_poisoning".

diagnose(Symptoms, Diagnosis) :-
    Symptoms.fever == true,
    Symptoms.chills == true,
    Symptoms.headache == true,
    Symptoms.nausea == true,
    Symptoms.vomiting == true, !,
    Diagnosis = "malaria".

diagnose(_, "unknown"). % Default case