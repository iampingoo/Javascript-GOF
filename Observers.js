class ObserverList extends Array {
    constructor() {
        super();
        
        ObserverList.prototype.Add = function( obj ) {
            return this.push( obj );
        };

        ObserverList.prototype.Count = function() {
            return this.length;
        };

        ObserverList.prototype.Get = function( index ) {
            if( index > -1 && index < this.length ) {
                return this[ index ];
            }
        };

        ObserverList.prototype.Empty = function() {
            this.length = 0;
        };

        ObserverList.prototype.Insert = function( obj, index ) {
            var pointer = -1;

            if( index === 0 ) {
                this.unshift( obj );
                pointer = index;
            } else if( index === this.length ) {
                this.push( obj );
                pointer = index;
            }
            return pointer;
        };

        ObserverList.prototype.RemoveIndexAt = function( index ) {
            if( index === 0 ) {
                this.shift();
            } else if ( index === this.length - 1 ) {
                this.pop();
            } else {
                this.splice( index, 1 );
            }
        };

        ObserverList.prototype.Remove = function( obj ) {
            for ( let i = 0, len = this.length; i < len; i++ ) {
                if ( this[ i ] === obj ) {
                    this.splice( i, 1 );
                    return true;
                }
            }
            return false;
        };
    };
};

export class Subject {
    constructor() {
        this.observers = new ObserverList();

        Subject.prototype.AddObserver = function( observer ) {
            //this.observers.Add( observer ); //　AddでもpushでもOK
            this.observers.push( observer );
        };

        Subject.prototype.RemoveObserver = function( observer ) {
            this.observers.RemoveIndexAt( this.observers.indexOf( observer ,0 ) );
        };

        Subject.prototype.Notify = function( context ) {
            var observerCount   = this.observers.Count();
            for( let i = 0; i < observerCount; i++ ) {
                this.observers.Get( i ).Update( context );
            }
        };
    };
};


/**
 * 新しいオブザーバを作成するための骨組み
 *
 * @usage   extend( new Observer(), myObs ); myObs.Update = myObs.mydata...
 */
export class Observer {
    constructor() {
        this.Update = () => {};
    };
}

const extend = ( obj, extension ) => {
    for ( var key in obj ) {
        extension[ key ] = obj[ key ];
    }
}

export { extend };
